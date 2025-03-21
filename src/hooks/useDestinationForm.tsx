import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function useDestinationForm() {
    const destinationFormSchema = z.object({
        location: z.string(),
        radius: z.string(),
    })

    type DestinationData = z.infer<typeof destinationFormSchema>

    const destinationForm = useForm<DestinationData>({
        resolver: zodResolver(destinationFormSchema),
    });

    return {
        destinationForm,
        destinationFormSchema,
    }
}
