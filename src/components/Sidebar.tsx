import '@coreui/coreui/dist/css/coreui.min.css';
import {
  CButton,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CNavItem,
  CFormInput,
  CForm,
  CCol,
  CFormRange,
} from '@coreui/react';
import {
  defaultRadius,
  defaultLocation,
  defaultDestination,
} from '../utils/defaults.ts';
import useLocationForm from '../hooks/useLocationForm.tsx';

export interface SidebarProps {
  radius: number;
  handleSetRadius: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSetHomeCoordinates: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSetDestinationCoordinates: (e: React.FormEvent<HTMLFormElement>) => void;
  distanceInMeters: number | null;
  form: ReturnType<typeof useLocationForm>['form'];
}
export default function Sidebar({
  radius,
  handleSetRadius,
  handleSetHomeCoordinates,
  handleSetDestinationCoordinates,
  form
}: SidebarProps) {
  //const [radiusStepFidelity]

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
          <CForm onSubmit={handleSetHomeCoordinates}>
            <CCol xs='auto'>
              <CFormInput
                type='text'
                floatingClassName='mb-3'
                floatingLabel='Enter Location'
                defaultValue={defaultLocation}
                {...form.register('location')}
              />
              <CButton
                color='primary'
                type='submit'
                className='w-100 mb-4'>
                Set Location
              </CButton>
            </CCol>
          </CForm>

          <CForm onSubmit={handleSetDestinationCoordinates}>
            <CCol className='py-4 border-top border-3'>
              <CFormRange
                {...form.register('radius')}
                defaultValue={defaultRadius}
                label={`Maximum Radius: ${radius} miles`}
                min={0}
                max={500}
                step={5}
                onChange={handleSetRadius}
              />
              {/* Range slider fidelity */}
              <CCol className='d-flex flex-row justify-content-between gap-2 mb-4'>
                <CButton
                  color='primary'
                  size='sm'
                  style={{ width: '50%' }}>
                  Coarse
                </CButton>
                <CButton
                  color='primary'
                  size='sm'
                  style={{ width: '50%' }}>
                  Fine
                </CButton>
              </CCol>
              <CCol xs='auto'>
                <CFormInput
                  type='text'
                  {...form.register('location')}
                  floatingClassName='mb-3'
                  floatingLabel='Enter Destination'
                  defaultValue={defaultDestination}
                />
                <CButton
                  color='primary'
                  type='submit'
                  className='w-100 mb-4'
                >
                  Set Destination
                </CButton>
              </CCol>
            </CCol>
          </CForm>
        </CNavItem>
      </CSidebarNav >
    </CSidebar >
  );
}
