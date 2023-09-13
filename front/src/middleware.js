import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  if(!(request.cookies.get("token")?.value)){
    return NextResponse.redirect(new URL('/', request.url))
  }else{
    // const redux = request.reduxState;
    // console.log({redux});
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/misRestaurantes',"/misRestaurantes/:id*"],
}