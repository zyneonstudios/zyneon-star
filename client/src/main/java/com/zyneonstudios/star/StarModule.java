package com.zyneonstudios.star;

import com.zyneonstudios.application.main.NexusApplication;
import com.zyneonstudios.application.modules.ApplicationModule;
import com.zyneonstudios.application.modules.ModuleConnector;

public class StarModule extends ApplicationModule {

    private final StarConnector connector;

    public StarModule(NexusApplication application) {
        super(application, "zyneon-star-module", "Zyneon Star", "unknown", "Zyneon Studios");
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
}