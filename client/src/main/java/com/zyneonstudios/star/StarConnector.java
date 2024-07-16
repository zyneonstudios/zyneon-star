package com.zyneonstudios.star;

import com.zyneonstudios.application.frame.web.ApplicationFrame;
import com.zyneonstudios.application.main.ApplicationConfig;
import com.zyneonstudios.application.main.NexusApplication;
import com.zyneonstudios.application.modules.ApplicationModule;
import com.zyneonstudios.application.modules.ModuleConnector;

import java.awt.*;
import java.net.URI;

public class StarConnector extends ModuleConnector {

    private final ApplicationFrame frame;
    private final StarModule module;

    public StarConnector(StarModule module) {
        super(module);
        this.module = module;
        frame = (ApplicationFrame)this.module.getApplication().getFrame();
    }

    @Override
    public void resolveFrameRequest(String request) {
        if(request.startsWith("sync.title.")) {
            resolveInitRequest("menu");
        } else if(request.equals("init.settings.modules")) {
            resolveInitRequest("settings");
        } else if(request.startsWith("star.")) {
            resolveStarRequest(request.replaceFirst("star.",""));
        }
    }

    public void resolveStarRequest(String request) {
        if(request.startsWith("init.")) {
            resolveInitRequest(request.replaceFirst("init.",""));
        } else if(request.startsWith("sync.")) {
            resolveSyncRequest(request.replaceFirst("sync.",""));
        } else if(request.startsWith("tools.")) {
            resolveToolRequest(request.replaceFirst("tools.",""));
        } else if(request.startsWith("tool.")) {
            resolveToolRequest(request.replaceFirst("tool.",""));
        } else if(request.startsWith("browse.")) {
            request = request.replaceFirst("browse.","");
            if(Desktop.isDesktopSupported()) {
                try {
                    Desktop.getDesktop().browse(new URI(request));
                } catch (Exception e) {
                    NexusApplication.getLogger().error("[STAR] (Connector) Couldn't open url \""+request+"\" in default browser: "+e.getMessage());
                }
            }
        } else if(request.equals("open")) {
            boolean dark = false;
            if (ApplicationConfig.theme != null) {
                if (ApplicationConfig.theme.endsWith("-dark.css")) {
                    dark = true;
                }
            }
            frame.openCustomPage("Star", "zyneon-star_start", "https://zyneonstudios.github.io/zyneon-star/?app=true&theme=" + dark);
        } else if(request.equals("init")) {
            frame.executeJavaScript("document.getElementById('zyneon-star').classList.add('highlighted');");
        } else {
            NexusApplication.getLogger().error("[STAR] (CONNECTOR) Couldn't resolve StarRequest \""+request+"\"...");
        }
    }

    public void resolveInitRequest(String request) {
        if(request.equals("menu")) {
            frame.executeJavaScript("addMenuEntry('zyneon-star','bx bx-star','Star','star.open');");
        } else if(request.equals("settings")) {
            frame.executeJavaScript("addGroup(\""+module.getName()+"\",\""+module.getId()+"\"); addModuleSetting('bx bx-star','Markdown Editor','star.tool.markdown-editor.open','star.markdownEditor',false,\""+module.getId()+"\");");
        } else {
            NexusApplication.getLogger().error("[STAR] (CONNECTOR) Couldn't resolve StarInitRequest \""+request+"\"...");
        }
    }

    public void resolveSyncRequest(String request) {
        NexusApplication.getLogger().error("[STAR] (CONNECTOR) Couldn't resolve StarSyncRequest \""+request+"\"...");
    }

    public void resolveToolRequest(String request) {
        if(request.startsWith("markdown-editor.")) {
            request = request.replaceFirst("markdown-editor.","");
            if(request.equals("open")) {
                frame.openCustomPage("Markdown-Editor","zyneon-star_markdown-editor","https://zyneonstudios.github.io/zyneon-star/templates/editor.html?back=reload&id=settings");
            }
        } else {
            NexusApplication.getLogger().error("[STAR] (CONNECTOR) Couldn't resolve StarToolRequest \""+request+"\"...");
        }
    }
}
