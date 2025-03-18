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
import { defaultRadius, defaultLocation } from '../utils/defaults.ts';

export interface SidebarProps {
  location: string;
  setLocation: (location: string) => void;
  setDestination: (destination: string) => void;
  maxRadius: string;
  setMaxRadius: (maxRadius: string) => void;
  handleSetLocation: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSetDestination: (e: React.FormEvent<HTMLFormElement>) => void;
}
export default function Sidebar({
  setLocation,
  setDestination,
  maxRadius,
  setMaxRadius,
  handleSetLocation,
  handleSetDestination,
}: SidebarProps) {
  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxRadius(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'location') {
      setLocation(event.target.value);
    } else if (event.target.id === 'destination') {
      setDestination(event.target.value);
    }
  };

  return (
    <CSidebar className='border-end'>
      <CSidebarHeader>
        <CSidebarBrand
          className='h2 text-primary'
          as='h1'>
          RangeFinder
        </CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav>
        <CNavItem>
          <CForm onSubmit={handleSetLocation}>
            <CCol xs='auto'>
              <CFormInput
                type='text'
                id='location'
                floatingClassName='mb-3'
                floatingLabel='Enter Location'
                defaultValue={defaultLocation}
                onChange={handleInputChange}
              />
              <CButton
                color='primary'
                type='submit'
                className='w-100 mb-4'>
                Set Location
              </CButton>
            </CCol>
          </CForm>
          <CCol className='py-4 border-top border-3'>
            <CFormRange
              id='maxRadius'
              value={maxRadius}
              onChange={handleRangeChange}
              label={`Maximum Radius: ${maxRadius || defaultRadius} miles`}
              min={0}
              max={500}
              step={5}
            />
          </CCol>
          <CForm
            className='pt-4 border-top border-3'
            onSubmit={handleSetDestination}>
            <CCol xs='auto'>
              <CFormInput
                type='text'
                id='destination'
                floatingClassName='mb-3'
                floatingLabel='Enter Destination'
                onChange={handleInputChange}
              />
              <CButton
                color='primary'
                type='submit'
                className='w-100 mb-4'>
                Set Destination
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
