package com.zyneonstudios.star;

import com.zyneonstudios.application.frame.web.ApplicationFrame;
import com.zyneonstudios.application.main.ApplicationStorage;
import com.zyneonstudios.application.main.NexusApplication;
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
        } else if(request.startsWith("open.")) {
            resolveOpenRequest(request.replaceFirst("open.",""));
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
                    NexusApplication.getLogger().err("[STAR] (Connector) Couldn't open url \""+request+"\" in default browser: "+e.getMessage());
                }
            }
        } else if(request.equals("open")) {
            boolean dark = false;
            if (ApplicationStorage.theme != null) {
                if (ApplicationStorage.theme.endsWith("-dark.css")) {
                    dark = true;
                }
            }
            if(NexusApplication.getModuleLoader().getModuleIds().contains("nexus-minecraft-module")) {
                if(com.zyneonstudios.star.integrations.MinecraftModuleIntegration.getIntegration()!=null) {
                    com.zyneonstudios.star.integrations.MinecraftModuleIntegration.getIntegration().openStar();
                }
            }
            frame.openCustomPage("Star", "zyneon-star_start", StarStorage.starUrlBase+"?app=true&theme=" + dark);
        } else if(request.equals("init")) {
            frame.executeJavaScript("document.getElementById('zyneon-star').classList.add('highlighted'); document.getElementById('zyneon-star').onclick = null; document.getElementById('iframe').src = '"+StarStorage.starUrlBase+"?app=continue"+"';");
        } else if(request.equals("sync")) {
            if(NexusApplication.getModuleLoader().getModuleIds().contains("nexus-minecraft-module")) {
                if(com.zyneonstudios.star.integrations.MinecraftModuleIntegration.getIntegration()!=null) {
                    com.zyneonstudios.star.integrations.MinecraftModuleIntegration.getIntegration().initStar();
                }
            }
        } else {
            NexusApplication.getLogger().err("[STAR] (CONNECTOR) Couldn't resolve StarRequest \""+request+"\"...");
        }
    }

    public void resolveOpenRequest(String request) {
        if(request.equals("minecraft")) {
            frame.getBrowser().loadURL(ApplicationStorage.urlBase+ApplicationStorage.language+"/library.html?moduleId=nexus-minecraft-module_java");
        }
    }

    public void resolveInitRequest(String request) {
        switch (request) {
            case "menu" -> {
                //frame.executeJavaScript("if(!document.getElementById('zyneon-star')) {addMenuEntry('zyneon-star','bx bxs-star','Star','star.open');}");
            }
            case "settings" ->
                    frame.executeJavaScript("addGroup(\"Tools\",\"tools\"); addModuleSetting('bx bxl-markdown','Markdown Editor','star.tool.markdown-editor.open','zyneon-star_tool-markdownEditor',false,'tools');");
            case "editor" ->
                    frame.executeJavaScript("document.getElementById('zyneon-star').classList.add('highlighted');");
            default ->
                    NexusApplication.getLogger().err("[STAR] (CONNECTOR) Couldn't resolve StarInitRequest \"" + request + "\"...");
        }
    }

    public void resolveSyncRequest(String request) {
        NexusApplication.getLogger().err("[STAR] (CONNECTOR) Couldn't resolve StarSyncRequest \""+request+"\"...");
    }

    public void resolveToolRequest(String request) {
        if(request.startsWith("markdown-editor.")) {
            request = request.replaceFirst("markdown-editor.","");
            if(request.equals("open")) {
                boolean dark = false;
                if (ApplicationStorage.theme != null) {
                    if (ApplicationStorage.theme.endsWith("-dark.css")) {
                        dark = true;
                    }
                }
                frame.openCustomPage("Markdown-Editor","zyneon-star_markdown-editor",StarStorage.starUrlBase+"templates/editor.html?id=settings&theme="+dark+"&back=reload");
            }
        } else {
            NexusApplication.getLogger().err("[STAR] (CONNECTOR) Couldn't resolve StarToolRequest \""+request+"\"...");
        }
    }
}
