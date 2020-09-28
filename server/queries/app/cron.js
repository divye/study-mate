var schedule = require('node-schedule');
const util = require('../../lib/util');
const sgMail = require('@sendgrid/mail');

async function scheduleDiscountEnd(endDate, discountId) {
  return schedule.scheduleJob(endDate, async function() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const userEmailQuery = `SELECT email FROM users WHERE discount_id = $1`;
    const users = await util.db.query(userEmailQuery, [discountId]).then((res) => 
      res.rows).catch((err) => console.error(err));
    
    const discountRulesQuery = `SELECT * FROM discount_rule where discount_id = $1 ORDER BY num_people ASC`;
    const discountRules = await util.db.query(discountRulesQuery, [discountId]).then((res) => res.rows).catch((err) => console.error(err));
    const userCount = parseInt(users.length);
    
    const groups = discountRules.map((obj) => obj.num_people);
    const currentDiscount = getCurrentDiscount(userCount, groups);
    const currentDiscountIndex = groups.indexOf(currentDiscount);
    const discountObj = discountRules[currentDiscountIndex];

    console.log(discountRules, endDate, discountId, currentDiscount);

    if(!discountObj) return null;
    const percent = discountObj.percent;

    const urlQuery = `SELECT url from discounts WHERE id = $1`;
    const urlObj = await util.db.query(urlQuery, [discountId]).then((res) => res.rows[0]).catch((err) => console.error(err));
    
    const discountCode = urlObj.url + '-' + percent;
    console.log(users, discountCode, percent);
    users.map((user, ind) => {
      const msg = {
        to: user.email,
        from: 'orders@fromfarm.ca',
        subject: 'Study Mate - Discount Code',
        html: `
        <h4>Your discount code period has ended</h4>
        <p>Here is your discount code for ${percent}% off - <h4>${discountCode}</h4></p>
        <a href="${process.env.REACT_APP_DOMAIN}/sign-up/">Sign Up</a>`,
      };
      sgMail.send(msg)
    })
  })
}

function getCurrentDiscount(userCount, groups) {
  let group = -1;
  if(userCount >= groups[0]) {
    let i = 0;
    group = groups[0];
    while(userCount >= groups[i]  && (i < groups.length)) {
      group = groups[i];
      i++;
    } 
  }
  return group;
}

module.exports = {
  scheduleDiscountEnd
}