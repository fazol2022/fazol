import UserModel from '../../models/userModel';
import { createUserContext } from 'minimal-components-react/dist/contexts/user';

const UserContext = createUserContext<UserModel>();

export { UserContext };
