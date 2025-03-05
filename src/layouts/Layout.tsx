import { CContainer } from '@coreui/react/';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CContainer className='d-flex flex-row min-vh-100 min-vw-100 overflow-hidden relative'>
      {children}
    </CContainer>
  );
}
