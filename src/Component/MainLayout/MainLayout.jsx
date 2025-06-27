import Drawer from './../Drawer/Drawer'

export default function MainLayout({children}) {
  
  return (
    <div>
      <Drawer />
      {children}
    </div>
  );
}
