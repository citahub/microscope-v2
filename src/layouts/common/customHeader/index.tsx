import * as React from 'react'
import './index.styl'

import Menu, {SubMenu, MenuItem} from 'rc-menu';
import 'rc-menu/assets/index.css';

import { hashHistory } from 'react-router';

class CustomHeader  extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
  }
  onDropdownVisibleChange(){

  }
  onMenuSelectLanguage(){

  }
  render() {
    var self = this;
    var networks = ["MainNet","TestNet"];
    var languages = ["Chinese","English"];
    return (
      <div className='customHeader' style={{ paddingTop: 20 }}>
        <div className='withRow container' style={{ height: 41  }}>
          <div onClick={(e)=>{hashHistory.push('/')}}><img src='images/headLogo_Microscope.png'/></div>
          <div>
              <span className='menu' onClick={()=>{hashHistory.push('/block/list')}}>Block</span>
              <span className='menu' onClick={()=>{hashHistory.push('/transaction/list')}}>Transition</span>
              <span className='menu'>Static</span>
              <span className='menu'>Setting</span>
          </div>
          <div style={{ marginLeft: 100 }}>
            <div className="input-group">
              <input placeholder="Search by Address / Txhash / Block / Token / Ens" type="text" className='form-control' />
              <div className="input-group-append">
                <span className="input-group-text">search</span>
              </div>
            </div>
          </div>
          <div>
            <Menu
                onClick={()=>{}}
                mode="horizontal"
                triggerSubMenuAction="click"
                onSelect={d=>{

                }}
                >
              <SubMenu key={"MainNet"} title={"M"}>
                {
                  networks.map(function(network,i){
                    return   <MenuItem key={network}>{network}</MenuItem>
                  })
                }

              </SubMenu>
            </Menu>
          </div>
          <div>
            <Menu
                onClick={()=>{}}
                mode="horizontal"
                triggerSubMenuAction="click"
                onSelect={d=>{

                }}
                >
              <SubMenu key={"Chinese"} title={"E"}>
                {
                  languages.map(function(language,i){
                    return   <MenuItem key={language}>{language}</MenuItem>
                  })
                }

              </SubMenu>
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}
export default CustomHeader;
