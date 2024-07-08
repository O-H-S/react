export const PATH = {
    ROOT: '/',
    LOGIN: '/login',
    REGISTER: '/registration',
    MY_PAGE: '/mypage',
    PROFILE: '/profile',
    COMMUNITY: '/community',
    POST_WRITE: '/postwrite',
    POST_DETAIL: (id: string) => `/post/${id}`,
    BOARD: (id: string) => `/board/${id}`,
    PROBLEM: (id: string) => `/problem/${id}`,
    RELOAD: 0,
  } as const;
