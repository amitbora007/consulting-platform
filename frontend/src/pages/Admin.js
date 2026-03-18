import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TestimonialsManager from "@/components/admin/TestimonialsManager";
import CaseStudiesManager from "@/components/admin/CaseStudiesManager";
import AppointmentsList from "@/components/admin/AppointmentsList";
import ArticlesManager from "@/components/admin/ArticlesManager";
import { Building2 } from "lucide-react";

const Admin = () => {
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 md:gap-4 mb-2">
            <Building2 className="w-6 h-6 md:w-8 md:h-8 text-bronze-500" strokeWidth={1.5} />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-white/60 font-sans text-xs md:text-sm uppercase tracking-widest font-mono">
            Content Management System
          </p>
        </div>

        <Tabs defaultValue="appointments" className="w-full">
          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 mb-6 md:mb-8">
            <TabsList className="bg-white/5 border border-white/10 p-1 inline-flex min-w-full md:min-w-0">
              <TabsTrigger 
                value="appointments" 
                className="data-[state=active]:bg-white data-[state=active]:text-black uppercase tracking-widest text-[10px] md:text-xs px-3 md:px-4 whitespace-nowrap"
                data-testid="admin-tab-appointments"
              >
                Appointments
              </TabsTrigger>
              <TabsTrigger 
                value="videos" 
                className="data-[state=active]:bg-white data-[state=active]:text-black uppercase tracking-widest text-[10px] md:text-xs px-3 md:px-4 whitespace-nowrap"
                data-testid="admin-tab-videos"
              >
                Videos
              </TabsTrigger>
              <TabsTrigger 
                value="cases" 
                className="data-[state=active]:bg-white data-[state=active]:text-black uppercase tracking-widest text-[10px] md:text-xs px-3 md:px-4 whitespace-nowrap"
                data-testid="admin-tab-cases"
              >
                Cases
              </TabsTrigger>
              <TabsTrigger 
                value="articles" 
                className="data-[state=active]:bg-white data-[state=active]:text-black uppercase tracking-widest text-[10px] md:text-xs px-3 md:px-4 whitespace-nowrap"
                data-testid="admin-tab-articles"
              >
                Articles
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="appointments">
            <AppointmentsList />
          </TabsContent>

          <TabsContent value="videos">
            <TestimonialsManager />
          </TabsContent>

          <TabsContent value="cases">
            <CaseStudiesManager />
          </TabsContent>

          <TabsContent value="articles">
            <ArticlesManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
