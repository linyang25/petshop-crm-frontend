import { MantineProvider, AppShell, Text, Group, Button } from '@mantine/core';
import { IconPaw, IconUsers, IconCalendar, IconSettings } from '@tabler/icons-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <AppShell
          padding="md"
          navbar={
            <AppShell.Navbar p="xs">
              <AppShell.Section>
                <Group p="md">
                  <IconPaw size={24} />
                  <Text size="xl" weight={700}>PetShop CRM</Text>
                </Group>
              </AppShell.Section>
              <AppShell.Section grow mt="md">
                <Button
                  variant="subtle"
                  fullWidth
                  leftIcon={<IconUsers size={20} />}
                  component={Link}
                  to="/customers"
                >
                  Customers
                </Button>
                <Button
                  variant="subtle"
                  fullWidth
                  leftIcon={<IconPaw size={20} />}
                  component={Link}
                  to="/pets"
                >
                  Pets
                </Button>
                <Button
                  variant="subtle"
                  fullWidth
                  leftIcon={<IconCalendar size={20} />}
                  component={Link}
                  to="/appointments"
                >
                  Appointments
                </Button>
              </AppShell.Section>
              <AppShell.Section>
                <Button
                  variant="subtle"
                  fullWidth
                  leftIcon={<IconSettings size={20} />}
                  component={Link}
                  to="/settings"
                >
                  Settings
                </Button>
              </AppShell.Section>
            </AppShell.Navbar>
          }
          header={
            <AppShell.Header p="xs">
              <Group position="apart">
                <Text size="lg" weight={500}>Dashboard</Text>
                <Group>
                  <Button variant="light">Notifications</Button>
                  <Button variant="light">Profile</Button>
                </Group>
              </Group>
            </AppShell.Header>
          }
        >
          <Routes>
            <Route path="/" element={<Text>Welcome to PetShop CRM</Text>} />
            <Route path="/customers" element={<Text>Customers Management</Text>} />
            <Route path="/pets" element={<Text>Pets Management</Text>} />
            <Route path="/appointments" element={<Text>Appointments Management</Text>} />
            <Route path="/settings" element={<Text>Settings</Text>} />
          </Routes>
        </AppShell>
      </Router>
    </MantineProvider>
  );
}

export default App;
