
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

export class ErrorHandler {
    public static handleError(code: string): void {
        Swal.fire('Error', code, 'error').then()
    }
}
