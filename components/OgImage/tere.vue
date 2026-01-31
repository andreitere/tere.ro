<script setup lang="ts">
defineOgImage()

const props = withDefaults(defineProps<{
  title?: string,
  headline?: string,
  description?: string,
  theme?: string,
  image?: string,
  category?: string,
}>(), {
  title: 'Untitled Article',
  description: 'No description provided',
  headline: 'Andrei Terecoasa',
  theme: '#7aa2f7',
})

// Truncate description
const truncatedDescription = computed(() => {
  if (!props.description) return '';
  return props.description.length > 120 
    ? `${props.description.slice(0, 117)}...` 
    : props.description;
});

// Tokyo Night color palette
const colors = {
  bg: '#1a1b26',
  bgDark: '#16161e',
  bgHighlight: '#292e42',
  border: '#3b4261',
  fg: '#c0caf5',
  fgDark: '#565f89',
  comment: '#565f89',
  red: '#f7768e',
  orange: '#ff9e64',
  yellow: '#e0af68',
  green: '#9ece6a',
  cyan: '#7dcfff',
  blue: '#7aa2f7',
  magenta: '#bb9af7',
}

const accentColor = computed(() => props.theme || colors.blue);
</script>

<template>
  <div :style="{
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.bg,
    fontFamily: 'Fira Code',
  }">
    <!-- Terminal window chrome -->
    <div :style="{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px 24px',
      backgroundColor: colors.bgDark,
      borderBottom: `1px solid ${colors.border}`,
      position: 'relative',
    }">
      <!-- Traffic lights - using absolute positioning for each dot -->
      <div :style="{ 
        position: 'absolute',
        left: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '72px',
        height: '16px',
      }">
        <div :style="{ position: 'absolute', left: '0px', top: '0px', width: '16px', height: '16px', borderRadius: '9999px', backgroundColor: colors.red }"></div>
        <div :style="{ position: 'absolute', left: '26px', top: '0px', width: '16px', height: '16px', borderRadius: '9999px', backgroundColor: colors.yellow }"></div>
        <div :style="{ position: 'absolute', left: '52px', top: '0px', width: '16px', height: '16px', borderRadius: '9999px', backgroundColor: colors.green }"></div>
      </div>
      <!-- Centered tab -->
      <div :style="{
        padding: '8px 20px',
        backgroundColor: colors.bg,
        borderRadius: '8px',
        border: `1px solid ${colors.border}`,
        color: colors.fg,
        fontSize: '16px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '4px',
      }">
        <span :style="{ color: colors.fgDark }">~/tere.ro</span>
        <span v-if="category" :style="{ color: accentColor }">/{{ category }}</span>
      </div>
    </div>
    
    <!-- Terminal content -->
    <div :style="{
      flex: '1',
      padding: '48px 60px',
      color: colors.fg,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }">
      <!-- Command prompt line -->
      <div :style="{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', fontSize: '18px', marginBottom: '28px' }">
        <span :style="{ color: colors.green }">❯</span>
        <span :style="{ color: colors.blue }">cat</span>
        <span :style="{ color: colors.fg }">article.md</span>
      </div>
      
      <!-- Cat output box - title and description -->
      <div :style="{
        backgroundColor: colors.bgHighlight,
        borderRadius: '12px',
        border: `1px solid ${colors.border}`,
        padding: '32px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginBottom: '32px',
      }">
        <!-- Title -->
        <div :style="{ fontSize: '42px', fontWeight: '700', color: colors.fg, lineHeight: '1.2' }">
          {{ title }}
        </div>
        
        <!-- Description -->
        <div :style="{ fontSize: '22px', color: colors.comment, lineHeight: '1.5' }">
          {{ truncatedDescription }}
        </div>
      </div>
      
      <!-- Author row: name left, photo right -->
      <div :style="{ 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '24px',
      }">
        <!-- Author name left -->
        <div :style="{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }">
          <span :style="{ color: colors.cyan, fontSize: '22px' }">{{ headline }}</span>
        </div>
        
        <!-- Profile picture right -->
        <img 
          src="https://tere.ro/photos/andrei-terecoasa.jpg"
          :style="{
            width: '72px',
            height: '72px',
            borderRadius: '9999px',
            border: `3px solid ${colors.border}`,
          }"
        />
      </div>
      
      <!-- Bottom prompt -->
      <div :style="{ marginTop: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', fontSize: '18px' }">
        <span :style="{ color: colors.green }">❯</span>
        <span :style="{ color: colors.cyan }">tere.ro</span>
        <span :style="{ width: '12px', height: '24px', backgroundColor: colors.fg }"></span>
      </div>
      
      <!-- Accent glow effect -->
      <div :style="{
        position: 'absolute',
        right: '-60px',
        bottom: '-60px',
        width: '260px',
        height: '260px',
        borderRadius: '9999px',
        opacity: '0.12',
        backgroundColor: accentColor,
      }"></div>
      
      <!-- Secondary glow -->
      <div :style="{
        position: 'absolute',
        left: '-40px',
        top: '30%',
        width: '140px',
        height: '140px',
        borderRadius: '9999px',
        opacity: '0.08',
        backgroundColor: colors.magenta,
      }"></div>
    </div>
  </div>
</template>
