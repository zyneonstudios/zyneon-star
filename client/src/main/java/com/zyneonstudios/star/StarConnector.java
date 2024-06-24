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

    }
}
