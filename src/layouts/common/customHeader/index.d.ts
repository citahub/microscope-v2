import  React from 'react';
import './index.styl';
declare class CustomHeader extends React.Component<any, any> {
    refs: {
        search: any;
    };
    keyDownListener: any;
    componentDidMount(): void;
    onDropdownVisibleChange(): void;
    onMenuSelectLanguage(): void;
    query(): void;
    render(): JSX.Element;
}
export default CustomHeader;
