import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const SupabaseTest = () => {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'error'>('testing');
  const [error, setError] = useState<string | null>(null);
  const [tables, setTables] = useState<string[]>([]);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      // Test basic connection
      const { data, error } = await supabase
        .from('jobs')
        .select('count')
        .limit(1);

      if (error) {
        throw error;
      }

      setConnectionStatus('connected');
      
      // Try to get table names (this might fail if RLS is enabled)
      try {
        const { data: tableData } = await supabase
          .from('information_schema.tables')
          .select('table_name')
          .eq('table_schema', 'public');
        
        if (tableData) {
          setTables(tableData.map(t => t.table_name));
        }
      } catch (tableError) {
        // This is expected if RLS is enabled
        console.log('Could not fetch table names (RLS might be enabled)');
      }

    } catch (err: any) {
      setConnectionStatus('error');
      setError(err.message || 'Connection failed');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Supabase Connection Test
          {connectionStatus === 'testing' && <Loader2 className="h-5 w-5 animate-spin" />}
          {connectionStatus === 'connected' && <CheckCircle className="h-5 w-5 text-green-500" />}
          {connectionStatus === 'error' && <XCircle className="h-5 w-5 text-red-500" />}
        </CardTitle>
        <CardDescription>
          Testing connection to your Supabase database
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="font-medium">Status:</span>
          <Badge variant={connectionStatus === 'connected' ? 'default' : connectionStatus === 'error' ? 'destructive' : 'secondary'}>
            {connectionStatus === 'testing' && 'Testing...'}
            {connectionStatus === 'connected' && 'Connected'}
            {connectionStatus === 'error' && 'Error'}
          </Badge>
        </div>

        {connectionStatus === 'connected' && (
          <div className="space-y-2">
            <p className="text-sm text-green-600">✅ Successfully connected to Supabase!</p>
            <p className="text-sm text-muted-foreground">
              Your database is accessible and the jobs table exists.
            </p>
            {tables.length > 0 && (
              <div>
                <p className="text-sm font-medium">Available tables:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {tables.map(table => (
                    <Badge key={table} variant="outline" className="text-xs">
                      {table}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {connectionStatus === 'error' && (
          <div className="space-y-2">
            <p className="text-sm text-red-600">❌ Connection failed</p>
            <p className="text-sm text-muted-foreground">
              Error: {error}
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Common issues:</p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>Check your environment variables in .env file</li>
                <li>Verify your Supabase URL and anon key</li>
                <li>Make sure the 'jobs' table exists in your database</li>
                <li>Check if Row Level Security (RLS) is enabled</li>
              </ul>
            </div>
          </div>
        )}

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Environment variables detected:
          </p>
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono">VITE_SUPABASE_URL:</span>
              <Badge variant={import.meta.env.VITE_SUPABASE_URL ? 'default' : 'destructive'} className="text-xs">
                {import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Missing'}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono">VITE_SUPABASE_ANON_KEY:</span>
              <Badge variant={import.meta.env.VITE_SUPABASE_ANON_KEY ? 'default' : 'destructive'} className="text-xs">
                {import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Missing'}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupabaseTest;
