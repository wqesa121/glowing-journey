export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem('theme');var l=t==='light';document.documentElement.classList.toggle('light',l);document.documentElement.classList.toggle('dark',!l);}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
