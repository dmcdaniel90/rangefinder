import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function useHomeFormSchema() {
    const homeFormSchema = z.object({
        location: z.string(),
    })

    type HomeData = z.infer<typeof homeFormSchema>

    const homeForm = useForm<HomeData>({
        resolver: zodResolver(homeFormSchema),
    });

    return {
        homeForm,
        homeFormSchema,
    }
}
