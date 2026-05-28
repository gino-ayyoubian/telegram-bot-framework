export type BotFlow =
  | 'auth' | 'order' | 'payment' | 'support' | 'profile' | 'settings' | 'main';

export type BotState =
  | 'START' | 'LANG_SELECT' | 'MAIN_MENU'
  | 'AUTH_CHECK' | 'REGISTER_NAME' | 'REGISTER_PHONE' | 'VERIFY_OTP'
  | 'SERVICE_LIST' | 'SERVICE_DETAIL' | 'ORDER_FORM' | 'ORDER_REVIEW' | 'ORDER_CONFIRM'
  | 'PAYMENT_INIT' | 'PAYMENT_PENDING' | 'PAYMENT_SUCCESS' | 'PAYMENT_FAIL'
  | 'SUPPORT_MENU' | 'NEW_TICKET' | 'TICKET_OPEN' | 'TICKET_WAITING'
  | 'PROFILE_VIEW' | 'SETTINGS_MENU'
  | 'BACK' | 'CANCEL' | 'TIMEOUT' | 'ERROR' | 'END';

export interface BotSessionData {
  flowName: BotFlow;
  currentState: BotState;
  context: Record<string, any>;
  lastMessageId?: number;
  expiresAt?: string;
}

export interface UserProfile {
  id: string;
  telegramId: number;
  fullName?: string;
  username?: string;
  phone?: string;
  role: 'user' | 'agent' | 'admin' | 'superadmin';
  status: 'active' | 'blocked' | 'pending';
}