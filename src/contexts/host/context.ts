import HostModel from '../../models/hostModel';
import { createHostContext } from 'minimal-components-react/dist/contexts/host';

const HostContext = createHostContext<HostModel>();

export { HostContext };
