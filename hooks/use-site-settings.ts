'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface SiteSetting {
  key: string;
  value: string;
  category: string;
}

interface SiteSettings {
  [key: string]: string;
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data, error: fetchError } = await supabase
          .from('site_settings')
          .select('key, value, category');

        if (fetchError) throw fetchError;

        const settingsMap: SiteSettings = {};
        data?.forEach((setting: SiteSetting) => {
          settingsMap[setting.key] = setting.value;
        });

        setSettings(settingsMap);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  return { settings, loading, error };
}
