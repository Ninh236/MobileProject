interface AuthorizationEvents {
  jwtPayload?: string
  on(event: 'unauthorized', callback: () => void): this
}
