import { toast } from "react-toastify";

export default function axiosHandler(error) {
    toast.error(error);
}