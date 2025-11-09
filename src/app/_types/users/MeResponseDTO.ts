import { BusinessUserResponseDTO } from "./BusinessUserResponseDTO";
import { NotificationPreferencesDTO } from "../NotificationPreferencesDTO";

export interface MeResponseDTO extends BusinessUserResponseDTO {
    notificationPreferences: NotificationPreferencesDTO;
}