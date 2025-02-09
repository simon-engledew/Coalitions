import reducer, { userLoggedIn, userLoggedOut } from '../slice';

const accessToken = 'OX1dSSVRFX1BPU1QsQ0FOX1JFQURfTkV';
const refreshToken = 'refreshToken';
const token = { accessToken, refreshToken };
const initialState = {
  accessToken: null,
  refreshToken: null,
  isLogged: false,
  afterAuthAction: { followCause: null, redirectTo: null },
};

describe('Login reducer', () => {
  describe('USER_LOGIN_SUCCESS case', () => {
    it('Should return an initial state with a token in the token field', () => {
      const action = userLoggedIn(token);
      const expectedState = { ...initialState, ...token, isLogged: true };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
});

describe('Logout reducer', () => {
  describe('USER_LOGOUT case', () => {
    it('Should remove all information about the logged in user', () => {
      const action = userLoggedOut;
      const loggedState = { ...initialState, ...token };
      const expectedState = initialState;

      expect(reducer(loggedState, action)).toEqual(expectedState);
    });
  });
});
