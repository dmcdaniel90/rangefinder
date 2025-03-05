import '@coreui/coreui/dist/css/coreui.min.css';
import {
  CButton,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
  CNavItem,
  CFormInput,
  CForm,
  CCol,
  CFormRange,
} from '@coreui/react';

export interface SidebarProps {
  homeLocation: string;
  setHomeLocation: (homeLocation: string) => void;
  maxRadius: string;
  setMaxRadius: (maxRadius: string) => void;
  defaultRadius: number;
  handleHomeLocationChange: (e: React.FormEvent<HTMLFormElement>) => void;
}
export default function Sidebar({
  homeLocation,
  setHomeLocation,
  maxRadius,
  setMaxRadius,
  defaultRadius,
  handleHomeLocationChange,
}: SidebarProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHomeLocation(event.target.value);
  };

  return (
    <CSidebar className='border-end'>
      <CSidebarHeader>
        <CSidebarBrand>RangeFinder</CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav>
        <CNavItem>
          <CForm onSubmit={handleHomeLocationChange}>
            <CCol xs='auto'>
              <CFormInput
                type='text'
                id='homeLocation'
                floatingClassName='mb-3'
                floatingLabel='Enter Home Location'
                value={homeLocation}
                onChange={handleInputChange}
              />
              <CFormRange
                id='maxRadius'
                value={maxRadius}
                onChange={(e) => setMaxRadius(e.target.value)}
                label={`Maximum Radius: ${maxRadius || defaultRadius} miles`}
                min={0}
                max={500}
                step={5}
              />
            </CCol>
            <CCol>
              <CButton
                color='primary'
                type='submit'
                className='mt-3'>
                Set Location
              </CButton>
            </CCol>
          </CForm>
        </CNavItem>
      </CSidebarNav>
      <CSidebarHeader className='border-top'>
        <CSidebarToggler />
      </CSidebarHeader>
    </CSidebar>
  );
}
