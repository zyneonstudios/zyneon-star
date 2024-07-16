package com.zyneonstudios.star;

import com.zyneonstudios.application.frame.web.ApplicationFrame;
import com.zyneonstudios.application.modules.ApplicationModule;
import com.zyneonstudios.application.modules.ModuleConnector;

public class StarConnector extends ModuleConnector {

    private final ApplicationFrame frame;

    public StarConnector(ApplicationModule module) {
        super(module);
        frame = (ApplicationFrame)module.getApplication().getFrame();
    }

    @Override
    public void resolveFrameRequest(String request) {
        if(request.startsWith("sync.title.")) {
            frame.executeJavaScript("addMenuEntry('zyneon-star','bx bx-star','Star','star.open');");
        } else if(request.equals("init.zyneon-star")) {
            frame.executeJavaScript("document.getElementById('zyneon-star').classList.add('highlighted');");
        } else if(request.equals("star.open")) {
            frame.openCustomPage("Star","zyneon-star","https://star.zyneonstudios.com");
        }
    }
}
