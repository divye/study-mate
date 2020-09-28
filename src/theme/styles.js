import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

export const PRIMARY_BACKGROUND = '#077481';
export const SECONDARY_TEXT = '#FFF';
export const PRIMARY_TEXT = '#000';

export const NavBar = styled(AppBar)({
  background: PRIMARY_BACKGROUND,
  flexGrow: 1,
});

export const NavButton = styled(Button)({
  color: SECONDARY_TEXT,
  flexGrow: 1,
  margin: 5,
  '&:hover': {
     color: SECONDARY_TEXT
  }
});

export const PrimaryButton = styled(Button)({
  background: PRIMARY_BACKGROUND,
  color: SECONDARY_TEXT,
  margin: 5,
  borderColor: PRIMARY_BACKGROUND,
  borderWidth: 1,
  borderStyle: 'solid',
  '&:hover': {
     color: PRIMARY_BACKGROUND,
     borderColor: PRIMARY_BACKGROUND,
     backgroundColor: '#FFF',
  },
});

  