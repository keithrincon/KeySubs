import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/teams/:id',
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing',
    '/assets/images/dotted-pattern.png',
    '/assets/images/logo.svg',
    '/assets/images/hero.png',
    '/assets/icons/search.svg',
  ],
  ignoredRoutes: [
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing',
    '/public/assets/images/dotted-pattern.png',
    '/assets/images/logo.svg',
    '/assets/images/hero.png',
    '/assets/icons/search.svg',
  ],
});

export const config = {
  matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
