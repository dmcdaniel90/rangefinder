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
import { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce.ts';

export interface SidebarProps {
  radius: number;
  handleSetRadius: (number: number) => void;
  handleSetHomeCoordinates: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSetDestinationCoordinates: (e: React.FormEvent<HTMLFormElement>) => void;
  distanceInMeters: number | null;
  homeLocationForm: ReturnType<typeof useLocationForm>['homeLocationForm'];
  destinationLocationForm: ReturnType<typeof useLocationForm>['destinationLocationForm'];
}
export default function Sidebar({
  radius,
  handleSetRadius,
  handleSetHomeCoordinates,
  handleSetDestinationCoordinates,
  homeLocationForm,
  destinationLocationForm,
}: SidebarProps) {

  const [radiusStepFidelity, setRadiusStepFidelity] = useState<1 | 10>(10);
  const [isEditingRadius, setIsEditingRadius] = useState(false);
  const [editedRadius, setEditedRadius] = useState(radius);
  const debouncedEditedRadius = useDebounce(editedRadius, 600);

  const handleRadiusClick = () => {
    setEditedRadius(radius);
    setIsEditingRadius(true);
  };

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setEditedRadius(value);
    handleSetRadius(value);
  };

  const handleInputBlur = () => {
    setIsEditingRadius(false);
    handleSetRadius(debouncedEditedRadius);
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
          <CForm onSubmit={handleSetHomeCoordinates}>
            <CCol xs='auto'>
              <CFormInput
                type='text'
                floatingClassName='mb-3'
                floatingLabel='Enter Location'
                defaultValue={defaultLocation}
                {...homeLocationForm.register('location')}
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
              {!isEditingRadius ? (
                <label onClick={handleRadiusClick}>
                  Maximum Radius: {radius} miles
                </label>
              ) : (
                <CFormInput
                  type='number'
                  value={editedRadius}
                  onChange={handleRadiusChange} // Handles number input
                  onBlur={handleInputBlur}
                  autoFocus
                />
              )}
              <CFormRange
                {...destinationLocationForm.register('radius')}
                defaultValue={defaultRadius}
                min={0}
                max={500}
                step={radiusStepFidelity}
                onChange={(e) => handleSetRadius(Number(e.target.value))}
              />
              {/* Range slider fidelity */}
              <CCol className='d-flex flex-row justify-content-between gap-2 mb-4'>
                <CButton
                  color='primary'
                  size='sm'
                  style={{ width: '50%' }}
                  onClick={() => setRadiusStepFidelity(10)}>
                  Coarse
                </CButton>
                <CButton
                  color='primary'
                  size='sm'
                  style={{ width: '50%' }}
                  onClick={() => setRadiusStepFidelity(1)}>
                  Fine
                </CButton>
              </CCol>
              <CCol xs='auto'>
                <CFormInput
                  type='text'
                  {...destinationLocationForm.register('location')}
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
