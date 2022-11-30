<template>
  <div class="css-doodle-page">
    <!-- <css-doodle grid="6" style="width: 100%">
      :doodle {
        @size: 20em;
        grid-gap: 15px;
      }
      
      transition: all .4s ease;		
      border-top: 1px solid hsl(@rand(137.50deg, 360deg), 80%, 80%);
      border-right: 1px solid hsl(@rand(137.50deg, 360deg), 80%, 80%);
  
      :after {
        content: \@hex(@rand(9632, 9687));
        color: hsl(@rand(137.50deg, 360deg), 80%, 80%);
      }
      
      @random {
        border-top: 1px solid transparent;
        border-right: 1px solid transparent;
        border-bottom: 1px solid hsl(@rand(137.50deg, 360deg), 80%, 80%);
        border-left: 1px solid hsl(@rand(137.50deg, 360deg), 80%, 80%);
        border-style: dashed;
      }
    </css-doodle> -->
    <css-doodle>
      @grid: 14 / 80%;
      @random {
        border-left: 1px solid #5d81bc;
      }
      @random {
        border-top: 1px solid #5d81bc;
      }
      @random(.25) {
        background: linear-gradient(
          @p(#fff, tan, #5d81bc), @lp
        )
        50% / @r(60%) @lr
        no-repeat;
      }
      @random {
        filter: drop-shadow(0 0 10px #fff);
      }
    </css-doodle>
  </div>
</template>

<script setup>
  import 'css-doodle';
</script>

<style>
.css-doodle-page{
  width: 300px;
  height: 300px;
}
</style>
