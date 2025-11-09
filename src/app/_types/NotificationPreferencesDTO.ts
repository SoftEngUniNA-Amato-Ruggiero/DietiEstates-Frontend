export class NotificationPreferencesDTO {
    city: string;
    emailNotificationsEnabled: boolean;
    notificationsForSaleEnabled: boolean;
    notificationsForRentEnabled: boolean;

    constructor(
        city: string = '',
        emailNotificationsEnabled: boolean = true,
        notificationsForSaleEnabled: boolean = true,
        notificationsForRentEnabled: boolean = true
    ) {
        this.city = city;
        this.emailNotificationsEnabled = emailNotificationsEnabled;
        this.notificationsForSaleEnabled = notificationsForSaleEnabled;
        this.notificationsForRentEnabled = notificationsForRentEnabled;
    }
}