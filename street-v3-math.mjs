export const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export function vfov(aspect,near=false){return Math.min(near?44:56,Math.atan(Math.tan((near?50:82)*Math.PI/360)/aspect)*360/Math.PI);}
export function bounds(aspect,fov){const v=fov*Math.PI/360,h=Math.atan(Math.tan(v)*aspect);return{yaw:Math.PI/2-h,pitch:Math.PI/4-v};}
export function constrain(view,aspect){const b=bounds(aspect,view.fov);view.pitch=clamp(view.pitch,-b.pitch,b.pitch);const v=Math.tan(view.fov*Math.PI/360),edge=Math.PI/2-Math.atan(v*aspect/(Math.cos(view.pitch)-Math.abs(Math.sin(view.pitch))*v));view.yaw=clamp(view.yaw,-edge,edge);return view;}
export const direction=(u,v)=>({yaw:(u-.5)*Math.PI,pitch:(.5-v)*Math.PI/2});
export function project(spot,view,w,h){const dy=spot.yaw-view.yaw,cp=Math.cos(spot.pitch),x=Math.sin(dy)*cp,y0=Math.sin(spot.pitch),z0=Math.cos(dy)*cp,y=y0*Math.cos(view.pitch)-z0*Math.sin(view.pitch),z=y0*Math.sin(view.pitch)+z0*Math.cos(view.pitch),t=Math.tan(view.fov*Math.PI/360);return{x:w/2+x/z/t*h/2,y:h/2-y/z/t*h/2,visible:z>.1&&Math.abs(x/z/t)<w/h*.9&&Math.abs(y/z/t)<.9};}
