// import { AuthActions, AuthActionTypes } from './../actions/auth';
// import { User } from '../models/user';

// export interface State {
//   loggedIn: boolean;
//   loading: boolean;
//   error: string;
//   verificationError: string;
//   user: User | null;
// }

// export const initialState: State = {
//   loggedIn: false,
//   loading: false,
//   error: undefined,
//   verificationError: undefined,
//   user: new User('', 'GUEST', '')
// };

// export function reducer(state = initialState, action: AuthActions) {
//   switch (action.type) {
//     case AuthActionTypes.GET_USER:
//       return {...state, loading: true};

//     case AuthActionTypes.AUTHENTICATED:
//       const user = {...action.payload};
//       return {...state.user, user: user, loggedIn: true, loading: false};

//     case AuthActionTypes.NOT_AUTHENTICATED:
//       return {...state, ...initialState, loggedIn: false, loading: false};

//     case AuthActionTypes.LOGIN:
//       return {...state, loading: true};

//     case AuthActionTypes.AUTH_ERROR:
//       const authError = {...action.payload};
//       return {...state, error: authError, loggedIn: false, loading: false};

//     case AuthActionTypes.VERIFICATION_ERROR:
//       const verificationError = {...action.payload};
//       const newState = {...state, verificationError: verificationError, loggedIn: false, loading: false};
//       return newState;

//     case AuthActionTypes.LOGOUT:
//       return {...state, loggedIn: false, loading: true}

//     default:
//       return state;
//   }
// }

// export const getError = (state: State) => state.error;
// export const getVerificationError = (state: State) => state.verificationError;
// export const getLoading = (state: State) => state.loading;
// export const getLoggedIn = (state: State) => state.loggedIn;
// export const getUser = (state: State) => state.user;
