/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/ping": {
    get: {
      responses: {
        /** @description Default Response */
        200: {
          content: never;
        };
      };
    };
  };
  "/auth/sign-in": {
    post: {
      requestBody: {
        content: {
          "application/json": {
            /** Format: email */
            email: string;
            password: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              data: {
                username: string;
                name: string | null;
                id: string;
                image: string | null;
                customImage: string | null;
                bio: string | null;
                createdAt: string;
              };
            };
          };
        };
        /** @description Default Response */
        400: {
          content: {
            "application/json": {
              statusCode: number;
              message: string;
              error: string;
            };
          };
        };
        /** @description Default Response */
        404: {
          content: {
            "application/json": {
              statusCode: number;
              message: string;
              error: string;
            };
          };
        };
      };
    };
  };
  "/auth/register": {
    post: {
      requestBody: {
        content: {
          "application/json": {
            /** Format: email */
            email: string;
            username?: string;
            password: string;
            confirmPassword: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              data: {
                username: string;
                name: string | null;
                id: string;
                image: string | null;
                customImage: string | null;
                bio: string | null;
                createdAt: string;
              };
            };
          };
        };
        /** @description Default Response */
        400: {
          content: {
            "application/json": {
              statusCode: number;
              message: string;
              error: string;
            };
          };
        };
      };
    };
  };
  "/auth/me": {
    get: {
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              data: {
                username: string;
                name: string | null;
                id: string;
                image: string | null;
                customImage: string | null;
                bio: string | null;
                createdAt: string;
                theme: "LIGHT" | "DARK";
                notificationSound: "ON" | "OFF";
              };
            };
          };
        };
      };
    };
    delete: {
      responses: {
        /** @description Default Response */
        204: {
          content: {
            "application/json": Record<string, never>;
          };
        };
      };
    };
  };
  "/follower-stats/followers": {
    get: {
      parameters: {
        query: {
          userId: string;
          skip: string;
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              data: {
                users: string[];
                totalPages: number;
                currentPage: number;
                usersCount: number;
              };
            };
          };
        };
      };
    };
  };
  "/follower-stats/friends": {
    get: {
      parameters: {
        query: {
          userId: string;
          skip: string;
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              data: {
                users: string[];
                totalPages: number;
                currentPage: number;
                usersCount: number;
              };
            };
          };
        };
      };
    };
  };
  "/posts": {
    get: {
      parameters: {
        query: {
          skip: string;
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              postsCount: number;
              totalPages: number;
              currentPage: number;
              data: {
                  createdAt: string;
                  id: number;
                  authorId: string;
                }[];
            };
          };
        };
      };
    };
    post: {
      responses: {
        /** @description Default Response */
        200: {
          content: never;
        };
      };
    };
  };
  "/posts/user/{authorId}": {
    get: {
      parameters: {
        query: {
          skip: number;
        };
        path: {
          authorId: string;
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              postsCount: number;
              totalPages: number;
              currentPage: number;
              data: {
                  createdAt: string;
                  id: number;
                  authorId: string;
                }[];
            };
          };
        };
      };
    };
  };
  "/posts/{postId}/edit": {
    put: {
      parameters: {
        path: {
          postId: string;
        };
      };
      requestBody: {
        content: {
          "application/json": {
            description: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: never;
        };
      };
    };
  };
  "/posts/{postId}": {
    get: {
      parameters: {
        path: {
          postId: string;
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              data: {
                commentsCount: number;
                likesCount: number;
                images: {
                    id: number;
                    fileId: string;
                    name: string;
                    url: string;
                    thumbnailUrl: string;
                    width: number;
                    height: number;
                    size: number;
                  }[];
                createdAt: string;
                description: string;
                id: number;
                isLiked: boolean;
                authorId: string;
              };
            };
          };
        };
      };
    };
    delete: {
      parameters: {
        path: {
          postId: string;
        };
      };
      responses: {
        /** @description Default Response */
        204: {
          content: {
            "application/json": Record<string, never>;
          };
        };
      };
    };
  };
  "/posts/{postId}/like": {
    post: {
      parameters: {
        path: {
          postId: string;
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: never;
        };
      };
    };
    delete: {
      parameters: {
        path: {
          postId: string;
        };
      };
      responses: {
        /** @description Default Response */
        204: {
          content: {
            "application/json": Record<string, never>;
          };
        };
      };
    };
  };
  "/post/comment": {
    post: {
      requestBody: {
        content: {
          "application/json": {
            commentText: string;
            postId: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              data?: {
                id: number;
                userId: string;
                postId: number;
                createdAt: string;
                text: string;
              };
            };
          };
        };
      };
    };
  };
  "/post/comment/{commentId}": {
    delete: {
      parameters: {
        path: {
          commentId: string;
        };
      };
      responses: {
        /** @description Default Response */
        204: {
          content: {
            "application/json": Record<string, never>;
          };
        };
      };
    };
  };
  "/post/{postId}/comments": {
    get: {
      parameters: {
        query: {
          skip: string;
        };
        path: {
          postId: string;
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              data: {
                comments: {
                    text: string;
                    createdAt: string;
                    likesCount: number;
                    isLiked: boolean;
                    postId: number;
                    commentId: number;
                    authorId: string;
                  }[];
                commentsCount: number;
                totalPages: number;
                currentPage: number;
              };
            };
          };
        };
      };
    };
  };
  "/post/comment/{commentId}/like": {
    post: {
      parameters: {
        path: {
          commentId: string;
        };
      };
      responses: {
        /** @description Default Response */
        204: {
          content: {
            "application/json": Record<string, never>;
          };
        };
      };
    };
    delete: {
      parameters: {
        path: {
          commentId: string;
        };
      };
      responses: {
        /** @description Default Response */
        204: {
          content: {
            "application/json": Record<string, never>;
          };
        };
      };
    };
  };
  "/user/edit": {
    put: {
      requestBody: {
        content: {
          "application/json": {
            username: string | null;
            name: string | null;
            bio: string | null;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: never;
        };
      };
    };
  };
  "/user/avatar": {
    put: {
      requestBody: {
        content: {
          "multipart/form-data": {
            /** Format: binary */
            image: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: never;
        };
      };
    };
    delete: {
      responses: {
        /** @description Default Response */
        204: {
          content: {
            "application/json": Record<string, never>;
          };
        };
      };
    };
  };
  "/user/{userId}": {
    get: {
      parameters: {
        path: {
          userId: string;
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              data: {
                username: string;
                name: string | null;
                id: string;
                image: string | null;
                customImage: string | null;
                bio: string | null;
                createdAt: string;
                postsCount: number;
                followersCount: number;
                friendsCount: number;
                isFollowing: boolean;
              };
            };
          };
        };
      };
    };
  };
  "/user/username/{username}": {
    get: {
      parameters: {
        path: {
          username: string;
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              data: {
                username: string;
                name: string | null;
                id: string;
                image: string | null;
                customImage: string | null;
                bio: string | null;
                createdAt: string;
                postsCount: number;
                followersCount: number;
                friendsCount: number;
                isFollowing: boolean;
              };
            };
          };
        };
      };
    };
  };
  "/user/{userId}/follow": {
    post: {
      parameters: {
        path: {
          userId: string;
        };
      };
      responses: {
        /** @description Default Response */
        204: {
          content: {
            "application/json": Record<string, never>;
          };
        };
      };
    };
    delete: {
      parameters: {
        path: {
          userId: string;
        };
      };
      responses: {
        /** @description Default Response */
        204: {
          content: {
            "application/json": Record<string, never>;
          };
        };
      };
    };
  };
  "/user/preferences": {
    put: {
      requestBody?: {
        content: {
          "application/json": {
            theme?: "LIGHT" | "DARK";
            notificationSound?: "ON" | "OFF";
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: never;
        };
      };
    };
  };
  "/chat/check-user/{receiverId}": {
    get: {
      parameters: {
        path: {
          receiverId: string;
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              data: {
                id: number;
                senderId: string;
                receiverId: string;
              };
            };
          };
        };
      };
    };
  };
  "/chat/messages/{receiverId}": {
    get: {
      parameters: {
        query: {
          skip: string;
        };
        path: {
          receiverId: string;
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              data: {
                messages: {
                    senderId: string;
                    receiverId: string;
                    text: string;
                    createdAt: string;
                    id: string;
                  }[];
                totalPages: number;
                currentPage: number;
                messagesCount: number;
              };
            };
          };
        };
      };
    };
  };
  "/chat/users": {
    get: {
      parameters: {
        query: {
          skip: string;
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              data: {
                users: ({
                    id: string;
                    message: string | null;
                  })[];
                totalPages: number;
                currentPage: number;
                usersCount: number;
              };
            };
          };
        };
      };
    };
  };
  "/chat/message": {
    post: {
      requestBody: {
        content: {
          "application/json": {
            receiverId: string;
            senderId: string;
            message: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: never;
        };
      };
    };
  };
  "/chat/message/{messageId}": {
    delete: {
      parameters: {
        path: {
          messageId: string;
        };
      };
      responses: {
        /** @description Default Response */
        204: {
          content: {
            "application/json": Record<string, never>;
          };
        };
      };
    };
  };
  "/auth/google": {
    get: {
      responses: {
        /** @description Default Response */
        200: {
          content: never;
        };
      };
    };
  };
  "/auth/google/callback": {
    get: {
      responses: {
        /** @description Default Response */
        200: {
          content: never;
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
