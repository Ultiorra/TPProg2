import { useRouter } from "next/navigation";


export default function CommandesPage() {
    const router = useRouter();

    router.push('/mon-compte')
}