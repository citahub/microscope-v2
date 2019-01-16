import * as React from 'react'
import './index.styl'

import Menu, {SubMenu, MenuItem} from 'rc-menu';
import 'rc-menu/assets/index.css';

import { hashHistory } from 'react-router';

import { api } from '../../../utils/config'
import { getSelectNetwork,setSelectNetwork } from '../../../utils/storage'

class CustomHeader  extends React.Component {
  componentDidMount(){
  }
  onDropdownVisibleChange(){

  }
  onMenuSelectLanguage(){

  }
  render() {
    var self = this;
    var networks = api.serverList;
    var languages = ["Chinese","English"];
    var network = getSelectNetwork();
    return (
      <div className='customHeader' style={{ paddingTop: 20 }}>
        <div className='withRow container' style={{ height: 41  }}>
          <div className='operationItem' onClick={()=>{hashHistory.push('/')}}><img src='images/headLogo_Microscope.png'/></div>
          <div>
              <span className='menu operationItem' onClick={()=>{hashHistory.push('/block/list')}}>区块</span>
              <span className='menu operationItem' onClick={()=>{hashHistory.push('/transaction/list')}}>交易</span>
              <span className='menu operationItem'>统计</span>
              <span className='menu operationItem'>设置</span>
          </div>
          <div style={{ marginLeft: 100 }}>
            <div className="input-group">
              <input placeholder="Search by Address / Txhash / Block / Token / Ens" type="text" className='form-control' />
              <div className="input-group-append">
                <span className="input-group-text">搜索</span>
              </div>
            </div>
          </div>
          <div>
            <Menu
                onClick={()=>{}}
                mode="horizontal"
                triggerSubMenuAction="click"
                onSelect={(d:any)=>{
                  setSelectNetwork(d.key);
                  window.location.reload();
                }}
                >
              <SubMenu selectKey={[network]} title={"NET"}>
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
                onSelect={(d:any)=>{

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
