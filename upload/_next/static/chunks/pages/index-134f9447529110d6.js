(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(2217)}])},2217:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return B}});var a=t(5893),o=t(7294),l=t(9008),c=t.n(l),i=t(5587),r=t(887),s=t(9720),d=e=>{let{children:n,columns:t}=e;return(0,a.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(".concat(t,", 1fr)"),gridGap:10,padding:10},children:n})},u=t(4285),g=t(3408),m=t(1330),h=t(8575),p=t.n(h),x=t(5733),f=t.n(x);let j="media",y={png:"image/png",jpeg:"image/jpeg",jpg:"image/jpg",mp4:"video/mp4"},b={png:"data:".concat(y.png,";base64"),jpeg:"data:".concat(y.jpeg,";base64"),jpg:"data:".concat(y.jpg,";base64"),mp4:"data:".concat(y.mp4,";base64")};function v(e){let n;return"string"==typeof e&&(n=Object.keys(b).find(n=>0===e.indexOf(b[n]))),n}function w(e,n){return JSON.stringify([{id:"".concat(n.creationDate,"_1986597770"),description:n.description,location:n.location,date:new Date(n.creationDate),child:e.map((e,t)=>{let a=v(e.src),o="mp4"===a;if(e.fileName="".concat(n.creationDate,"_").concat(t,".").concat(a),o){var l;e.image={fileName:"".concat(n.creationDate,"_").concat(t,".jpg"),src:null==e?void 0:null===(l=e.image)||void 0===l?void 0:l.src},console.info("video: ".concat(e.image))}let c={type:o?"VIDEO":"IMAGE",height:608,width:1080,url:"",fileName:"".concat(j,"\\").concat(e.fileName)};return o&&(c.image={type:"IMAGE",height:608,width:1080,url:"",fileName:"".concat(j,"\\").concat(e.image.fileName)}),c})}],null,2)}let D=(0,o.forwardRef)((e,n)=>{var t;let{index:l,faded:c,style:i,...r}=e,d=(0,o.useRef)(),u=(0,o.useRef)(),[h,p]=(0,o.useState)(!1),[x,f]=(0,o.useState)(!1),[j,y]=(0,o.useState)(!1),[b,w]=(0,o.useState)(!1),D={opacity:c?"0.2":"1",transformOrigin:"0 0",height:200,width:200,backgroundSize:"cover",backgroundPosition:"center",backgroundColor:"grey",...i},N=(0,a.jsx)(g.Z.Label,{children:"No Image chosen"}),C=null==r?void 0:null===(t=r.media)||void 0===t?void 0:t.src;function Z(){var e;console.info("onCanvas: ".concat((0,s.inspect)(null===(e=r.media)||void 0===e?void 0:e.image)));let n=d.current;n.currentTime=10;let t=u.current;t.height=n.videoHeight,t.width=n.videoWidth,t.getContext("2d").drawImage(n,0,0),r.media.image={src:t.toDataURL("image/png")},console.log("thumbnail: ".concat(r.media.image.src))}return C&&(N="mp4"===v(C)?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("canvas",{className:"form-control",style:{maxHeight:200,maxWidth:200},ref:u}),(0,a.jsx)("video",{ref:d,src:C,style:{height:"100%",width:"100%",objectFit:"contain",display:"none"},className:"form-control",onLoadedMetadata:function(){Z(),p(!0)},onLoadedData:function(){Z(),f(!0)},onSuspend:function(){Z(),y(!0)},onSeeked:function(){Z(),w(!0)},controls:!0,children:"Sorry, your browser doesn't support embedded videos."})]}):(0,a.jsx)(m.Z,{src:C,style:{height:"100%",width:"100%",objectFit:"contain"},className:"form-control"})),(0,a.jsx)("div",{ref:n,style:D,...r,children:N})});var N=e=>{let{...n}=e,t=(0,i.nB)({id:n.index}),{attributes:o,listeners:l,isDragging:c,setNodeRef:r,transform:s,transition:d}=t,g={transform:u.ux.Transform.toString(s),transition:d};return(0,a.jsx)(D,{ref:r,style:g,...n,...o,...l})},C=e=>{let{photos:n,onSortEnd:t,sensors:l,columns:c}=e,[s,u]=(0,o.useState)(null);return(0,a.jsxs)(r.LB,{sensors:l,collisionDetection:r.pE,onDragStart:function(e){console.debug("handleDragStart: ".concat(e.active.id)),u(e.active.id)},onDragEnd:function(e){console.debug("handleDragEnd"),t(e),u(null)},onDragCancel:function(){console.debug("handleDragCancel"),u(null)},children:[n?(0,a.jsx)(i.Fo,{items:n,strategy:i.U2,children:(0,a.jsx)(d,{columns:c,children:n.map((e,n)=>(0,a.jsx)(N,{media:e,index:n},e.key))})}):(0,a.jsx)(a.Fragment,{}),(0,a.jsx)(r.y9,{adjustScale:!0,children:s?(0,a.jsx)(D,{media:n[s],index:s},n[s].key):(0,a.jsx)(a.Fragment,{})})]})},Z=t(3162),S=t.n(Z);t(3300);var k=t(5152),E=t.n(k),T=t(1604),_=t(3680),O=t(1280),L=t(9937),F=t(1664),I=t.n(F);function B(){let e;let n=(0,r.Dy)((0,r.VT)(r.MA),(0,r.VT)(r.LO)),[l,d]=(0,o.useState)([]),[u,h]=(0,o.useState)(null),[x,D]=(0,o.useState)(null),[N,Z]=(0,o.useState)({description:"",creationDate:new Date().getTime(),location:{name:"",lat:null,lng:null}}),[k,F]=(0,o.useState)(null),B=()=>{let e=!0;return Object.values(N).forEach(n=>(!n||0===n.length)&&(e=!1)),e&&Object.values(N.location).forEach(n=>(!n||0===n.length)&&(e=!1)),e&&(l&&0!==l.length||(e=!1)),e?F(null):F("All fields are required!"),e},P=e=>{d(n=>[...n,e])},R=(0,o.useCallback)(e=>{let n=Date.now();e.map((e,t)=>{let a=new FileReader;return a.onload=function(e){let a={key:n+"_"+t,src:e.target.result};P(a),D(a)},a.readAsDataURL(e),e})},[]),A=(0,o.useCallback)(e=>{let{active:n,over:t}=e,a=n.id,o=t.id;L.console.debug("onSortEnd: oldIndex: ".concat(a,", newIndex: ").concat(o)),a!==o?d(e=>(0,i.Rp)(e,a,o)):a>-1&&d(e=>{let t=e[n.id];return D(t),e})},[]),G=e=>{let{target:n}=e;L.console.debug("onChangeComment: ".concat(n.value)),Z(e=>({...e,description:n.value}))},M=e=>{let{target:n}=e;L.console.debug("onChangeCreationDate: ".concat((0,s.inspect)(n.value))),Z(e=>({...e,creationDate:new Date(n.value).getTime()}))},U=e=>{let{lat:n,lng:t,name:a}=e;L.console.debug("onMapClick: ".concat(n,", ").concat(t)),Z(e=>({...e,location:{name:a,lat:n,lng:t}}))},q=e=>{let{target:n}=e,{files:t}=n;L.console.info("onFileUploadHandler: ".concat(JSON.stringify(t.length)));let a=[];for(let o=0;o<t.length;o++)a[o]=t[o];R(a)},J=(0,o.useRef)(null),H=()=>{J.current.click()},V=E()(()=>Promise.all([t.e(269),t.e(554),t.e(484)]).then(t.bind(t,8004)),{loadableGenerated:{webpack:()=>[8004]},ssr:!1}),X=()=>{B()&&function(e,n,t){console.info("[generateZip]: images = ".concat((0,s.inspect)(e[0].image),"; form = ").concat((0,s.inspect)(n)));let a=new(f()),o=w(e,n),l=new Blob([o],{type:"application/json;charset=utf-8"});a.folder("data").file("metadata.json",l);let c=a.folder(j);function i(e){let{blob:n}=function(e){let n=v(e);console.debug("triggerBase64Download: ext = ".concat(n));let t=b[n];console.debug("triggerBase64Download: prepend = ".concat(t));let a=y[n];console.debug("triggerBase64Download: contentType = ".concat(a));let o=e.replace("".concat(t,","),"");console.debug("triggerBase64Download: cleanedBase64 = ".concat(o));let l=p()(o,a);return console.debug("triggerBase64Download: blob = ".concat(l)),{blob:l,ext:n}}(e.src);return c.file("".concat(e.fileName),n),n}for(let r=0;r<e.length;r++){let d=e[r];i(d),d.image&&i(d.image)}a.generateAsync({type:"blob"}).then(e=>{t(e,"example.zip")})}(l,N,(e,n)=>{S()(e,n)})};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(c(),{children:[(0,a.jsx)("title",{children:"Create Next App"}),(0,a.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,a.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,a.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,a.jsx)("main",{children:(0,a.jsxs)(g.Z,{children:[(0,a.jsx)("div",{className:"alert alert-danger",style:{display:k?"block":"none"},children:k}),(0,a.jsxs)(T.Z,{className:"mb-3",children:[(0,a.jsx)(T.Z.Text,{children:"Image Preview"}),(e=(0,a.jsx)(g.Z.Label,{children:"No Image chosen"}),x&&(e="mp4"===v(x.src)?(0,a.jsx)("video",{src:x.src,controls:!0,style:{height:"100%",width:"100%",objectFit:"contain"},className:"form-control",children:"Sorry, your browser doesn't support embedded videos."}):(0,a.jsx)(m.Z,{src:x.src,style:{height:"100%",width:"100%",objectFit:"contain"},className:"form-control"})),(0,a.jsx)("div",{style:{height:450,width:400},children:e})),(0,a.jsx)(_.Z,{variant:"secondary",onClick:H,children:"Upload Media"}),(0,a.jsx)(g.Z.Control,{ref:J,type:"file",style:{display:"none"},multiple:!0,onChange:q}),(0,a.jsx)("div",{style:{height:450,width:240,overflowX:"overlay"},className:"form-control",children:(0,a.jsx)(C,{photos:l,onSortEnd:A,sensors:n,columns:5},"imageBar")})]}),(0,a.jsxs)(T.Z,{className:"mb-3",children:[(0,a.jsx)(T.Z.Text,{children:"Description"}),(0,a.jsx)(g.Z.Control,{as:"textarea",rows:3,placeholder:"Enter Description",value:N.description,onChange:G}),(0,a.jsxs)("div",{children:[(0,a.jsx)(T.Z.Text,{children:"Creation Date"}),(0,a.jsx)(g.Z.Control,{type:"date",placeholder:"Enter Post Date",value:(0,O.ZP)(N.creationDate,"yyyy-mm-dd"),onChange:M}),(0,a.jsxs)(T.Z,{className:"mb-3",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(T.Z.Text,{children:"Location Name"}),(0,a.jsx)(I(),{className:"form-control",target:"_blank",style:{height:38},href:"https://maps.google.com/maps?q=loc:".concat(N.location.lat,",").concat(N.location.lng,"(").concat(N.location.name,")"),children:N.location.name}),(0,a.jsx)(T.Z.Text,{children:"Latitude"}),(0,a.jsx)(g.Z.Control,{type:"text",readOnly:!0,required:!0,placeholder:"Select Location",value:N.location.lat}),(0,a.jsx)(T.Z.Text,{children:"Longitude"}),(0,a.jsx)(g.Z.Control,{type:"text",readOnly:!0,required:!0,placeholder:"Select Location",value:N.location.lng})]}),(0,a.jsx)(V,{onMapClick:U,locationI:N.location})]})]})]}),(0,a.jsxs)(T.Z,{className:"mb-3",children:[(0,a.jsx)(_.Z,{variant:"secondary",onClick:function(){B()&&h(w(l,N))},children:"Generate JSON"}),(0,a.jsx)(_.Z,{onClick:X,children:"Download ZIP"})]}),(0,a.jsxs)(T.Z,{className:"mb-3",children:[(0,a.jsx)(T.Z.Text,{children:"Data Config"}),(0,a.jsx)(g.Z.Control,{as:"textarea",rows:30,placeholder:"Generate JSON",value:u,readOnly:!0})]})]})})]})}}},function(e){e.O(0,[233,774,888,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);