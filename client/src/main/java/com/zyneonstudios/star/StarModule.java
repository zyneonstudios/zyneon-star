package com.zyneonstudios.star;

import com.zyneonstudios.application.main.ApplicationConfig;
import com.zyneonstudios.application.main.NexusApplication;
import com.zyneonstudios.application.modules.ApplicationModule;
import com.zyneonstudios.application.modules.ModuleConnector;
import live.nerotv.shademebaby.utils.StringUtil;

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
        ArrayList<String> arguments = new ArrayList<>(Arrays.stream(args).toList());
        arguments.add("--test");
        arguments.add("--debug");
        arguments.add("--path:/home/nerotvlive/Dokumente/Workspaces/IntelliJ/Zyneon-Application/application-main/target/run/");
        arguments.add("--ui:file:///home/nerotvlive/Dokumente/Workspaces/IntelliJ/Zyneon-Application/application-ui/content/");
        //arguments.add("--ui:http://localhost:63342/index.html/application-ui/content/");
        args = arguments.toArray(new String[0]);
        new ApplicationConfig(args);
        NexusApplication application = new NexusApplication();
        NexusApplication.getLogger().setDebugEnabled(true);
        try {
            String v = new SimpleDateFormat("yyyy.M.d/HH-mm-ss").format(Calendar.getInstance().getTime());
            NexusApplication.getModuleLoader().loadModule(new StarModule(application,"zyneon-star-module","Star (Test)", v+"_"+ StringUtil.generateAlphanumericString(4), "Zyneon Studios"));
        } catch (Exception ignore) {}
        application.launch();
    }
}