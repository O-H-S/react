export const HTTP_STATUS_CODE = {
    SUCCESS: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONTENT_TOO_LARGE: 413,
    INTERNAL_SERVER_ERROR: 500,
  } as const;
  

export const HTTP_ERROR_MESSAGE = {

} as const;

export const ERROR_CODE = {

} as const;


export const END_POINTS = {
  USER: (userId: string|null = null) => userId?  `/api/accounts/${userId}` : '/api/accounts/',
  

  PROBLEM: (problemId: string |number| null = null) => problemId ? `/api/problems/${problemId}` : '/api/problems/',
  PROBLEM_POST: (problemId: string | number)  =>  `/api/problems/${problemId}/posts`,

  BOARD: (boardId: string|number| null = null) => boardId ? `/api/boards/${boardId}` : '/api/boards/',
  POSTS: (boardId: string|number) => `/api/${boardId}/posts`,
  POST: (postId: string|number| null = null) => postId ? `/api/posts/${postId}` : '/api/posts/',
  COMMENT: (commentId: string|number| null = null) => commentId ? `/api/comments/${commentId}` : '/api/comments/',
  LOGIN: 'api/accounts/login',
  LOGOUT : 'api/accounts/login',
} as const;


export const PROFILE = (id: string) => `https://ohsite.s3.ap-northeast-2.amazonaws.com/profile/${id}`;