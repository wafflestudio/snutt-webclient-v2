import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { TokenContextProvider } from '@/contexts/tokenContext';
import { envService } from '@/services';

import App from './App';

window.git = { sha: envService.getGitSha(), tag: envService.getGitTag() };

function startApp() {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <TokenContextProvider>
        <App />
      </TokenContextProvider>
    </StrictMode>,
  );
}

if (envService.getAppEnv() === 'test') {
  (async () => {
    const { worker } = await import('@/mocks/browser');
    worker.start({ onUnhandledRequest: 'bypass' });
    startApp();
  })();
} else {
  startApp();
}

console.log(`

                          ...        
                    ...   ..        
                        . .        
              .     ....,..        
                .....,*.....,.,..        
               ./(.(((*,,,  *,...,        
               / ,((((///*,*((****        
                 /*//((**,,,,.,*,,        
                   /////*,*,,..,,        
                    //*/////*,*,..        
                   ,*////*,,,,.  .....        
                 .  /////,,**. ,,....*.*/*//        
              ,,,   (((/////**/,.....*/,/*/*,,,*        
         ,,*,**,  /,./(((.  **,*  .*** ,,//**,.,,*        
       ***,**..   / ...    .,*,   ...**.//*. ..,,,*        
      .**/*,*.    / ....  ,*.     */*.,///,.. ..,,,*        
      **,,,*/.    / ...  ,  .  .**.....,.,.    ,,..,,        
     *,,,/*,,* .  /  ..  /..  .,,,,.,.*.*.   . ......,        
    .**. .,,,,*,  ,.  .. /.  .**,/,,...       ..  .,..        
    ,,**,*..,/.. ,    .. *,,,,,,,.,,.  ,,.   *,,,. ...,        
   ,,.*,,, *,*., . .   . ...,. ,*,,.  .,..   ,*.  ......        
  ***,,,,.  ,,,,...    . .,...,,,,., ...,.  .,. .,,...*.        
 ,*,*. ,..   ,,,*.      .....,.,...,.....   , .,,,.,*,.        
.,,*,,,,     ,,...      .. ,,,,,,.*,,,,..   .,,,,,,,,..        
 , ,,,,      ,,*,,      .  ,.,,,,,.,,.       ,,,,,*,  ..        
**,,,       ,.,,*     ...  .**,,,.... ..     ****,..

`);
