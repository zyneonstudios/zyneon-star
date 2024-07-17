package com.zyneonstudios.star.integrations;

import com.zyneonstudios.application.MinecraftJavaAddon;
import com.zyneonstudios.application.frame.web.ApplicationFrame;
import com.zyneonstudios.application.main.NexusApplication;
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
        if(getMinecraft().getAuthenticator().isLoggedIn()) {
            AuthInfos authInfos = getMinecraft().getAuthenticator().getAuthInfos();
            StarStorage.map.set("minecraft.username",authInfos.getUsername());
            StarStorage.map.set("minecraft.uuid",authInfos.getUuid());
        } else {
            StarStorage.map.delete("minecraft.username");
            StarStorage.map.delete("minecraft.uuid");
        }
        NexusApplication.getLogger().log("[STAR] (Minecraft Module Integration) Logged in as "+StarStorage.map.get("minecraft.username")+" ("+StarStorage.map.get("minecraft.uuid")+")...");
    }

    public void initStar() {
        if(getMinecraft().getAuthenticator().isLoggedIn()) {
            String username = StarStorage.map.getString("minecraft.username");
            ((ApplicationFrame)getMinecraft().getApplication().getFrame()).executeJavaScript("setMenuPanel(\"https://cravatar.eu/helmhead/" + username + "/64.png\",\"" + username + "\",\"Profile options\",true);");
        }
    }
}