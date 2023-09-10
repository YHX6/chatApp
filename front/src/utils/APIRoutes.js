export const host = "http://44.216.16.167:3001";
// export const host = process.env.REACT_APP_HOST;

export const registerRouter = `${host}/api/auth/register`;


export const loginRouter = `${host}/api/auth/login`;

export const setAvatarRouter = `${host}/api/auth/setAvatar`;

export const allUsersRouter = `${host}/api/auth/allUsers`;

export const sendMessageRouter = `${host}/api/msg/addmsg`;

export const getAllMessagesRouter = `${host}/api/msg/getallmsg`;

// FOR AI
export const addUserMessagesAI = `${host}/api/ai/addusermsg`;

export const addAIMessagesAI = `${host}/api/ai/addaimsg`;

export const getAllMessagesAI = `${host}/api/ai/getallmsg`;
