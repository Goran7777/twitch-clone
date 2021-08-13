interface IRootState {
  auth: Auth;
  form: Form;
  streams: Stream[];
}

interface Stream {
  title: string;
  description: string;
  id: number;
  userId: string | null;
}

interface Auth {
  isSignedIn: boolean;
  userId: null | string;
}
interface Form {
  streamCreate: StreamCreate;
}
interface StreamCreate {
  syncErrors: SyncErrors;
  registeredFields: RegisteredFields;
}
interface SyncErrors {
  title: string;
  description: string;
}
interface RegisteredFields {
  title: TitleOrDescription;
  description: TitleOrDescription;
}
interface TitleOrDescription {
  name: string;
  type: string;
  count: number;
}

interface IAuthAction {
  type: string;
  payload?: string;
}
interface IStreamsAction {
  type: string;
  payload?: any;
}
