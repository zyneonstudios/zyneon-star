package com.zyneonstudios.star;

import com.zyneonstudios.application.main.NexusApplication;
import com.zyneonstudios.application.modules.ApplicationModule;
import com.zyneonstudios.application.modules.ModuleConnector;
import com.zyneonstudios.nexus.desktop.NexusDesktop;
import com.zyneonstudios.nexus.utilities.NexusUtilities;
import com.zyneonstudios.nexus.utilities.strings.StringGenerator;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;

public class StarModule extends ApplicationModule {

    private final StarConnector connector;

    public StarModule(NexusApplication application, String id, String name, String version, String authors) {
        super(application, id, name, version, authors);
        this.connector = new StarConnector(this);
    }

    @Override
    public StarConnector getConnector() {
        return this.connector;
    }

    @Override
    public void onLoad() {

    }

    @Override
    public void onEnable() {

    }

    @Override
    public void onDisable() {

    }

    @Override @Deprecated
    public void setConnector(ModuleConnector connector) {}

    public static void main(String[] args) {
        NexusUtilities.getLogger().enableDebug();
        NexusDesktop.init();
        ArrayList<String> arguments = new ArrayList<>(Arrays.stream(args).toList());
        arguments.add("--path:D:/Workspaces/IntelliJ/nexus-app/application-main/target/run/");
        arguments.add("--ui:file://D:/Workspaces/IntelliJ/nexus-app/application-ui/content/");
        arguments.add("--debug");
        arguments.add("--test");
        args = arguments.toArray(new String[0]);
        NexusApplication application = new NexusApplication(args);
        try {
            String v = new SimpleDateFormat("yyyy.M.d/HH-mm-ss").format(Calendar.getInstance().getTime());
            NexusApplication.getModuleLoader().loadModule(new StarModule(application,"zyneon-star-module","Star (Test)", v+"_"+ StringGenerator.generateAlphanumericString(4), "Zyneon Studios"));
        } catch (Exception ignore) {}
        application.launch();
    }
}