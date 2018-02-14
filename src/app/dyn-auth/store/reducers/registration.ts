import { RegisterActionTypes, RegisterActions } from './../actions/register';

export interface State {
  error: string | null;
  code: string;
}

export const initialState: State = {
  error: null,
  code: '',
};

export function reducer(state = initialState, action: RegisterActions): State {
  switch (action.type) {
    case RegisterActionTypes.RegisterConfirmation: {
      console.log('Register::Confirmation::Action');
      return {
        ...state,
        error: null,
        code: action.payload.code,
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getCode = (state: State) => state.code;
