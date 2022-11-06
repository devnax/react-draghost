; (() => {
      if (typeof window === 'undefined') return
      const id = '_draggi'
      const isStyled = document?.getElementById(id)
      if (!isStyled) {
            const style = document.createElement('style')
            style.id = id

            document.head.appendChild(style)
            style.innerHTML = `
         .gu-mirror {
               position: fixed !important;
               margin: 0 !important;
               z-index: 9999 !important;
               opacity: 0.8;
               -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
               filter: alpha(opacity=80);
         }
         .gu-hide {
               display: none !important;
         }
         .gu-unselectable {
               -webkit-user-select: none !important;
               -moz-user-select: none !important;
               -ms-user-select: none !important;
               user-select: none !important;
         }
         .gu-transit {
               pointer-events: none;
               opacity: 0.2;
               -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)";
               filter: alpha(opacity=20);
         }
         [data-handler]{
               position: relative;
               cursor: move
         }
         [data-handler]::after{
               content: "";
               position: absolute;
               top: 0;
               left: 0;
               width: 100%;
               height: 100%;
               zIndex: 1;
         }
      `
      }
})()