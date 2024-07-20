package com.zyneonstudios.star.integrations;

import com.zyneonstudios.application.MinecraftJavaAddon;
import com.zyneonstudios.application.frame.web.ApplicationFrame;
import com.zyneonstudios.application.main.NexusApplication;
import com.zyneonstudios.application.minecraft.java.JavaStorage;
import com.zyneonstudios.star.StarStorage;
import fr.theshark34.openlauncherlib.minecraft.AuthInfos;

public class MinecraftModuleIntegration {

    private static MinecraftModuleIntegration integration = null;

    public static MinecraftModuleIntegration getIntegration() {
        if(integration == null) {
            if(NexusApplication.getModuleLoader().getModuleIds().contains("nexus-minecraft-module")) {
                integration = new MinecraftModuleIntegration((MinecraftJavaAddon)NexusApplication.getModuleLoader().getModules().get("nexus-minecraft-module"));
            }
        }
        return integration;
    }

    private final MinecraftJavaAddon minecraft;

    public MinecraftModuleIntegration(MinecraftJavaAddon module) {
        this.minecraft = module;
    }

    public MinecraftJavaAddon getMinecraft() {
        return minecraft;
    }

    public void openStar() {
        NexusApplication.getLogger().log("[STAR] (Minecraft Module Integration) Logged in as "+JavaStorage.map.get("auth.username")+" ("+JavaStorage.map.get("auth.uuid")+")...");
    }

    public void initStar() {
        if(getMinecraft().getAuthState()==MinecraftJavaAddon.AuthState.LOGGED_IN) {
            String username = JavaStorage.map.getString("auth.username");
            ((ApplicationFrame)getMinecraft().getApplication().getFrame()).executeJavaScript("setMenuPanel(\"https://cravatar.eu/helmhead/" + username + "/64.png\",\"" + username + " <a onclick=\\\"\\\"><i class='bx bxs-cog'></i></a>\",\"Logged in via <a href=\\\"javascript:connector('star.open.minecraft');\\\" class='bold'>Minecraft</a>\",true);");
        }
    }
}