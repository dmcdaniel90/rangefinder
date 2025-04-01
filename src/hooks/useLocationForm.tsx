import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function useLocationForm() {
    const formSchema = z.object({
        location: z.string(),
        radius: z.string().optional(),
    })

    type LocationData = z.infer<typeof formSchema>

    const homeLocationForm = useForm<LocationData>({
        resolver: zodResolver(formSchema),
    });

    const destinationLocationForm = useForm<LocationData>({
        resolver: zodResolver(formSchema),
    });

    return {
        homeLocationForm,
        destinationLocationForm,
        formSchema,
    }
}
