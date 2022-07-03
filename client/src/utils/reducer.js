export const initialState = {
    token: "",
    loading: false,
    user: {
        followers: "",
        id: "",
        img: "",
        name: "",
        following: "",
    },
    playlists: {
        number: "",
        items: []
    }
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TOKEN':
            // console.log(action.payload);
            return {
                ...state,
                token: action.payload

            }

        case 'ADD_USER':
            // console.log(action.payload);
            return {
                ...state,
                user: action.payload,
                loading: true,

            }

            case 'ADD_FOLLOWING':
            // console.log(action.payload);
            return {
                ...state,
                user: {...state.user, 
                    following : action.payload
                }

            }
        case 'REMOVE_TOKEN':
            return {

            }

        case 'ADD_PLAYLISTS':
            // console.log(action.payload);
            return {
                ...state,
                playlists: action.payload

            }
        case 'REMOVE_PLAYLISTS':
            return {

            }

        default: {
            return state
        }
    }

}